# Vercel Environment Variables Setup Guide

This guide will help you configure all necessary environment variables for the AlignSynch project deployment on Vercel.

## Required Environment Variables

### 1. NextAuth Configuration

**NEXTAUTH_SECRET**
- **Description**: Secret key for NextAuth.js session encryption
- **Required**: Yes
- **Format**: String (minimum 32 characters)
- **Example**: `your-32-character-secret-key-here-minimum-length`
- **Generation**: Run `openssl rand -base64 32` or use https://generate-secret.vercel.app/32

**NEXTAUTH_URL**
- **Description**: Canonical URL of your site
- **Required**: Yes (auto-detected on Vercel, but recommended to set)
- **Format**: Full URL with protocol
- **Production**: `https://your-domain.vercel.app`
- **Preview**: `https://your-branch-name-git-branch-username.vercel.app`

### 2. Application Configuration

**NEXT_PUBLIC_APP_URL**
- **Description**: Public URL for client-side usage
- **Required**: Yes
- **Format**: Full URL with protocol
- **Production**: `https://your-domain.vercel.app`
- **Preview**: `https://your-branch-name-git-branch-username.vercel.app`

**NEXT_PUBLIC_VERSION**
- **Description**: Application version for display and tracking
- **Required**: No (defaults to 1.0.0)
- **Format**: Semantic version string
- **Example**: `2.01.1`

## Optional Environment Variables

### 3. Database Configuration

**DATABASE_URL**
- **Description**: PostgreSQL database connection string
- **Required**: No (for basic functionality)
- **Format**: `postgresql://username:password@host:port/database`
- **Example**: `postgresql://user:pass@db.example.com:5432/alignsynch`

### 4. Email Configuration

**SMTP_HOST**
- **Description**: SMTP server hostname
- **Required**: No (disables email features if not set)
- **Example**: `smtp.gmail.com`

**SMTP_PORT**
- **Description**: SMTP server port
- **Required**: No
- **Example**: `587`

**SMTP_USER**
- **Description**: SMTP authentication username
- **Required**: No
- **Example**: `your-email@gmail.com`

**SMTP_PASSWORD**
- **Description**: SMTP authentication password
- **Required**: No
- **Example**: `your-app-password`

**FROM_EMAIL**
- **Description**: Default sender email address
- **Required**: No
- **Example**: `noreply@alignsynch.com`

## Setting Up Environment Variables

### In Vercel Dashboard

1. Go to your project in the Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with appropriate values for each environment:
   - **Production**: Used for your main domain
   - **Preview**: Used for branch deployments
   - **Development**: Used for local development (optional)

### Environment-Specific Configuration

#### Production Environment
\`\`\`
NEXTAUTH_SECRET=your-production-secret-32-chars-min
NEXTAUTH_URL=https://alignsynch.com
NEXT_PUBLIC_APP_URL=https://alignsynch.com
NEXT_PUBLIC_VERSION=2.01.1
\`\`\`

#### Preview Environment
\`\`\`
NEXTAUTH_SECRET=your-preview-secret-32-chars-min
NEXTAUTH_URL=https://alignsynch-git-main-username.vercel.app
NEXT_PUBLIC_APP_URL=https://alignsynch-git-main-username.vercel.app
NEXT_PUBLIC_VERSION=2.01.1-preview
\`\`\`

## GitHub Secrets for CI/CD

Add these secrets to your GitHub repository settings:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:

**VERCEL_TOKEN**
- Get from: https://vercel.com/account/tokens
- Scope: Full Account access

**VERCEL_ORG_ID**
- Get from: Vercel project settings → General → Project ID section

**VERCEL_PROJECT_ID**
- Get from: Vercel project settings → General → Project ID section

## Validation and Testing

### Health Check Endpoint

After deployment, test your configuration:
\`\`\`
GET https://your-domain.vercel.app/api/health
\`\`\`

This endpoint will return:
- Environment validation status
- Configuration check results
- Missing or invalid variables

### Local Development

1. Copy the example file:
\`\`\`bash
cp .env.example .env.local
\`\`\`

2. Fill in your local values in `.env.local`

3. Test your configuration:
\`\`\`bash
pnpm env:check
\`\`\`

## Troubleshooting

### Common Issues

**Build fails with "NEXTAUTH_SECRET is required"**
- Ensure NEXTAUTH_SECRET is set in all environments
- Verify it's at least 32 characters long

**"Invalid URL" errors**
- Check that all URL variables include the protocol (https://)
- Ensure no trailing slashes in URLs

**Email features not working**
- Verify all SMTP variables are set correctly
- Test SMTP credentials with your email provider

**Environment variables not updating**
- Redeploy after changing environment variables
- Clear Vercel's build cache if needed

### Getting Help

1. Check the health endpoint: `/api/health`
2. Review Vercel deployment logs
3. Verify environment variables in Vercel dashboard
4. Test locally with `.env.local` file

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different secrets** for production and preview environments
3. **Rotate secrets regularly**, especially NEXTAUTH_SECRET
4. **Use Vercel's encrypted environment variables** for sensitive data
5. **Limit access** to environment variables in team settings
