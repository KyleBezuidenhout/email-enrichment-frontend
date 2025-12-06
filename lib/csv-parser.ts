import Papa from 'papaparse';

export interface CSVColumn {
  name: string;
  index: number;
  sampleValues: string[];
}

export interface CSVParseResult {
  columns: CSVColumn[];
  rows: any[];
  totalRows: number;
}

export interface ColumnMapping {
  firstName: string | null;
  lastName: string | null;
  domain: string | null;
}

// Smart column detection based on header names and sample data
export function detectColumns(columns: CSVColumn[]): ColumnMapping {
  const mapping: ColumnMapping = {
    firstName: null,
    lastName: null,
    domain: null,
  };

  // Patterns for first name
  const firstNamePatterns = [
    /^first[\s_-]?name$/i,
    /^fname$/i,
    /^first$/i,
    /^given[\s_-]?name$/i,
    /^forename$/i,
  ];

  // Patterns for last name
  const lastNamePatterns = [
    /^last[\s_-]?name$/i,
    /^lname$/i,
    /^last$/i,
    /^surname$/i,
    /^family[\s_-]?name$/i,
  ];

  // Patterns for domain/website
  const domainPatterns = [
    /^domain$/i,
    /^website$/i,
    /^company[\s_-]?domain$/i,
    /^company[\s_-]?website$/i,
    /^url$/i,
    /^site$/i,
    /^web$/i,
  ];

  for (const column of columns) {
    const columnName = column.name.trim();

    // Check first name
    if (!mapping.firstName && firstNamePatterns.some(pattern => pattern.test(columnName))) {
      mapping.firstName = column.name;
    }

    // Check last name
    if (!mapping.lastName && lastNamePatterns.some(pattern => pattern.test(columnName))) {
      mapping.lastName = column.name;
    }

    // Check domain
    if (!mapping.domain && domainPatterns.some(pattern => pattern.test(columnName))) {
      mapping.domain = column.name;
    }
  }

  // If no exact matches, try fuzzy matching based on sample data
  if (!mapping.firstName || !mapping.lastName || !mapping.domain) {
    for (const column of columns) {
      const samples = column.sampleValues.filter(v => v && v.trim());
      
      if (!mapping.firstName && samples.length > 0) {
        // Check if values look like first names (short, capitalized, no special chars)
        const looksLikeFirstName = samples.every(v => 
          v.length > 0 && 
          v.length < 20 && 
          /^[A-Z][a-z]+$/.test(v)
        );
        if (looksLikeFirstName) {
          mapping.firstName = column.name;
        }
      }

      if (!mapping.domain && samples.length > 0) {
        // Check if values look like domains
        const looksLikeDomain = samples.some(v => 
          /^(https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}/.test(v.toLowerCase())
        );
        if (looksLikeDomain) {
          mapping.domain = column.name;
        }
      }
    }
  }

  return mapping;
}

// Parse CSV file and extract columns with sample data
export async function parseCSV(file: File): Promise<CSVParseResult> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const rows = results.data as any[];

        const columns: CSVColumn[] = headers.map((header, index) => {
          // Get first 5 non-empty values as samples
          const sampleValues = rows
            .slice(0, 5)
            .map(row => row[header])
            .filter(v => v && String(v).trim());

          return {
            name: header,
            index,
            sampleValues: sampleValues.map(v => String(v)),
          };
        });

        resolve({
          columns,
          rows,
          totalRows: rows.length,
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

// Extract domain from URL or company website
export function extractDomain(value: string): string {
  if (!value) return '';
  
  // Remove protocol
  let domain = value.replace(/^https?:\/\//i, '');
  
  // Remove www
  domain = domain.replace(/^www\./i, '');
  
  // Remove path and query string
  domain = domain.split('/')[0];
  domain = domain.split('?')[0];
  
  // Remove port
  domain = domain.split(':')[0];
  
  return domain.toLowerCase().trim();
}

// Prepare leads data from CSV rows and column mapping
export function prepareLeads(
  rows: any[],
  mapping: ColumnMapping,
  includeAllColumns: boolean = true
): any[] {
  if (!mapping.firstName || !mapping.lastName || !mapping.domain) {
    throw new Error('Missing required column mappings');
  }

  return rows.map(row => {
    const lead: any = {
      first_name: row[mapping.firstName!],
      last_name: row[mapping.lastName!],
      domain: extractDomain(row[mapping.domain!]),
    };

    // Include all other columns if requested
    if (includeAllColumns) {
      Object.keys(row).forEach(key => {
        if (key !== mapping.firstName && key !== mapping.lastName && key !== mapping.domain) {
          lead[key] = row[key];
        }
      });
    }

    return lead;
  });
}

// Validate CSV data
export function validateCSV(parseResult: CSVParseResult): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (parseResult.totalRows === 0) {
    errors.push('CSV file is empty');
  }

  if (parseResult.columns.length === 0) {
    errors.push('No columns found in CSV');
  }

  if (parseResult.totalRows > 10000) {
    errors.push('CSV file too large (max 10,000 rows)');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
