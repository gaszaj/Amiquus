# Data Structure Documentation for author.astro

## Overview
The `author.astro` file is structured to handle three main data sources:
- `author.json`: Author-specific data
- `common.json`: Common UI strings and labels
- `www.json`: Website-wide configuration and metadata

## Data Sources

### 1. author.json
Contains author-specific information including:
- Basic author details (name, bio, occupation)
- Social media links
- Image paths
- Publication dates
- Language capabilities
- SEO metadata

Key fields used in schema:
```json
{
  "AUTHOR_DATE_PUBLISHED": "2025-05-04",
  "AUTHOR_HOUR_PUBLISHED": "10:37:10",
  "AUTHOR_DATE_UPDATED": "2025-05-26",
  "AUTHOR_HOUR_UPDATED": "10:37:10"
}
```

### 2. common.json
Provides UI strings and labels, particularly for:
- Social media labels
- Author-related text
- Language labels
- Common UI elements

Example usage:
```json
{
  "AUTHOR_TITLE_EXTENSION": "avtor in urednik",
  "AUTHOR_OTHER_AUTHORS": "Ostali avtorji",
  "AUTHOR_READ_MORE": "Preberite našo uredniško politiko"
}
```

### 3. www.json
Contains website-wide configuration:
- Organization details
- Social media links
- Contact information
- Brand assets
- Analytics IDs

## Schema Implementation

### Type Definition
```typescript
interface AuthorData {
  AUTHOR_DATE_PUBLISHED: string;
  AUTHOR_HOUR_PUBLISHED: string;
  AUTHOR_DATE_UPDATED: string;
  AUTHOR_HOUR_UPDATED: string;
  // ... other author properties
}
```

### Schema Structure
The file implements three main schemas:

1. **WebPage Schema**
   - Uses author data for content
   - Implements breadcrumb navigation
   - Includes article metadata

2. **Person Schema**
   - Author's personal information
   - Social media links
   - Professional details
   - Language capabilities

3. **Organization Schema**
   - Company information
   - Contact details
   - Social media presence
   - Brand assets

### Data Integration

#### URL Handling
```typescript
const getAbsoluteUrl = (path) => {
  return new URL(path, Astro.url.origin).toString();
};
```

#### Date Formatting
Dates are formatted for schema using template literals:
```typescript
"datePublished": `${author.AUTHOR_DATE_PUBLISHED}T${author.AUTHOR_HOUR_PUBLISHED}+02:00`
```

#### Social Links
Social media links are structured in `authorProfileData`:
```typescript
socialLinks: {
  linkedin: author.WWW_AUTHOR_LINKEDIN,
  twitter: author.WWW_AUTHOR_X,
  website: author.WWW_AUTHOR_WEBSITE,
  // ... other social links
}
```

## Data Flow

1. **Initialization**
   - Import JSON data files
   - Type casting with TypeScript interface
   - Create helper functions

2. **Data Processing**
   - Format URLs using `getAbsoluteUrl`
   - Structure author profile data
   - Prepare language data

3. **Schema Generation**
   - Combine data from all sources
   - Format dates and times
   - Generate absolute URLs
   - Filter and validate data

4. **Layout Integration**
   - Pass processed data to `AuthorLayout`
   - Include schema data
   - Provide UI strings and labels

## Best Practices

1. **Type Safety**
   - Use TypeScript interfaces
   - Validate data existence
   - Handle undefined cases

2. **URL Management**
   - Use absolute URLs for external links
   - Generate dynamic URLs for internal links
   - Maintain consistent URL structure

3. **Data Organization**
   - Separate concerns (author, common, website)
   - Use clear naming conventions
   - Maintain consistent data structure

4. **Schema Compliance**
   - Follow Schema.org guidelines
   - Include required fields
   - Format dates correctly
   - Provide complete metadata
