# Vercel Environment Variables Setup Guide

This guide will help you configure all necessary environment variables for deploying AlignSynch to Vercel.

## 🔧 Required Environment Variables

### NextAuth Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXTAUTH_SECRET` | 32+ character secret for session encryption | `your-32-character-secret-key-here` | ✅ |
| `NEXTAUTH_URL` | Your application URL | `https://your-app.vercel.app` | ✅ |

### Public Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_APP_URL` | Public URL for client-side usage | `https://your-app.vercel.app` | ✅ |
| `NEXT_PUBLIC_VERSION` | Application version | `1.0.0` | ✅ |

## 🔧 Optional Environment Variables

### Database Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` | ❌ |

### Email Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` | ❌ |
| `SMTP_PORT` | SMTP server port | `587` | ❌ |
| `SMTP_USER` | SMTP username | `your-email@gmail.com` | ❌ |
| `SMTP_PASSWORD` | SMTP password | `your-app-password` | ❌ |
| `FROM_EMAIL` | From email address | `noreply@alignsynch.com` | ❌ |

## 🚀 Setting Up in Vercel

### Step 1: Access Project Settings

1. Go to your Vercel dashboard
2. Select your AlignSynch project
3. Click on the "Settings" tab
4. Navigate to "Environment Variables"

### Step 2: Add Environment Variables

For each environment variable:

1. Click "Add New"
2. Enter the variable name (e.g., `NEXTAUTH_SECRET`)
3. Enter the variable value
4. Select environments:
   - **Production**: For live deployments
   - **Preview**: For branch deployments
   - **Development**: For local development

### Step 3: Generate Required Values

#### NEXTAUTH_SECRET
Generate a secure 32+ character secret:

\`\`\`bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
\`\`\`

#### NEXTAUTH_URL
Set to your Vercel deployment URL:
- Production: `https://your-app.vercel.app`
- Preview: `https://your-app-git-branch.vercel.app`
- Development: `http://localhost:3000`

## 🔍 Environment Validation

### Health Check Endpoint

After deployment, visit `/api/health` to verify your configuration:

\`\`\`json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "checks": {
    "nextauth": {
      "configured": true,
      "url": "https://your-app.vercel.app"
    },
    "database": {
      "configured": false,
      "connected": false
    },
    "email": {
      "configured": false,
      "host": "not configured"
    }
  }
}
\`\`\`

### Local Development

1. Copy the example environment file:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Fill in your local values in `.env.local`

3. Test your configuration:
   \`\`\`bash
   pnpm env:check
   \`\`\`

## 🔒 Security Best Practices

### Environment-Specific Configuration

- **Production**: Use secure, production-ready values
- **Preview**: Use staging/test values
- **Development**: Use local development values

### Secret Management

1. **Never commit secrets** to version control
2. **Use strong, unique secrets** for each environment
3. **Rotate secrets regularly** for production
4. **Limit access** to environment variables

### Common Issues

#### Build Failures
- Ensure all required variables are set
- Check variable names for typos
- Verify URL formats are correct

#### Authentication Issues
- Confirm `NEXTAUTH_SECRET` is 32+ characters
- Verify `NEXTAUTH_URL` matches your domain
- Check that URLs don't have trailing slashes

#### Email Issues
- Verify SMTP credentials are correct
- Check firewall/security settings
- Test with a simple SMTP service first

## 📋 Quick Setup Checklist

- [ ] Set `NEXTAUTH_SECRET` (32+ characters)
- [ ] Set `NEXTAUTH_URL` (your domain)
- [ ] Set `NEXT_PUBLIC_APP_URL` (your domain)
- [ ] Set `NEXT_PUBLIC_VERSION` (your version)
- [ ] Configure database URL (if using database)
- [ ] Configure email settings (if using email)
- [ ] Test with `/api/health` endpoint
- [ ] Verify authentication works
- [ ] Test all application features

## 🆘 Troubleshooting

### Environment Variable Not Found

1. Check spelling and case sensitivity
2. Verify the variable is set in the correct environment
3. Redeploy after adding new variables

### Invalid URL Format

Ensure URLs:
- Start with `http://` or `https://`
- Don't have trailing slashes
- Use correct domain names

### Authentication Errors

1. Verify `NEXTAUTH_SECRET` is set and long enough
2. Check `NEXTAUTH_URL` matches your deployment URL
3. Ensure no trailing slashes in URLs

For additional help, check the health endpoint or contact support.
