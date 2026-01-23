# Example Data and Demo Content

This directory contains example data and demo content for the Navly project.

## Directory Structure

```
example/
└── seed/
    ├── demo-data.sql        # Demo integration and category data
    └── update-icons.sql     # Icon format migration script
```

## Seed Data Overview

The `seed/` directory contains demo data for development and testing purposes.

### demo-data.sql

Initial seed data including:

- **7 Categories**: DevTools, Messaging, Monitoring, Productivity, Security, Searching, etc.
- **16 Integration Examples**: Sanity, GitHub, Slack, ChatGPT, Stripe, and other real-world tools

**Purpose:**

- Quick application startup with functional data
- Data structure reference
- Development and testing baseline

### update-icons.sql

Updates icon fields from path format (`/icons/github.svg`) to brand identifiers (`github`) for use with the `simple-icons` library.

## Usage

### Method 1: Via Supabase Dashboard

1. Log in to Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and execute `demo-data.sql` content
4. (Optional) Execute `update-icons.sql` to update icon format

### Method 2: Via Supabase CLI

```bash
# Ensure Supabase CLI is installed
supabase db reset --db-url "your-database-url"

# Or execute SQL files directly
psql "your-database-url" < example/seed/demo-data.sql
psql "your-database-url" < example/seed/update-icons.sql
```

## Customization

This is demo data, and you can:

- ✅ Keep as example reference
- ✅ Modify to your own tools and resources
- ✅ Extend with more integrations
- ✅ Replace entirely with production data

## Data Structure

### categories Table

```sql
- id: Unique category identifier
- name: Category name
- description: Category description
- icon: Icon name (Lucide icon)
- order_weight: Sort weight
- enabled: Whether enabled
```

### integrations Table

```sql
- id: Unique integration identifier
- name: Integration name
- description: Integration description
- icon: Icon identifier (simple-icons brand name)
- url: Integration link
- category: Category association
- featured: Whether featured
- tags: Tag array
- background_color: Brand background color
- order_weight: Sort weight
- enabled: Whether enabled
```

## Icon System

The project uses two icon systems:

1. **Lucide Icons**: For UI elements and category icons
2. **Simple Icons**: For brand/integration icons (GitHub, Slack, etc.)

The `update-icons.sql` script converts legacy path-based icons to simple-icons identifiers.

## Best Practices

1. **Consistent Data**: Maintain consistent data structure across environments
2. **Version Control**: Keep seed data in version control
3. **Documentation**: Document any custom data structures
4. **Testing**: Use seed data for automated testing
5. **Production**: Never use seed data directly in production

## Adding Your Own Data

To add your own integrations:

1. Follow the data structure in `demo-data.sql`
2. Use valid simple-icons brand names for the `icon` field
3. Ensure `category` matches an existing category ID
4. Set appropriate `order_weight` for sorting
5. Use `featured: true` for homepage display

## Related Documentation

- [Database Schema](../docs/DATA_STRUCTURE.md) - Complete database schema documentation
- [Development Guide](../docs/DEVELOPMENT.md) - Development setup and workflow
- [Getting Started](../docs/GETTING_STARTED.md) - Quick start guide
