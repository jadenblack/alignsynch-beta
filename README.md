# AlignSynch - AI-Powered Relationship Platform

Transform your relationships with AI-powered alignment tools for deeper connections and stronger partnerships.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/alignsynch-beta.git
cd alignsynch-beta
\`\`\`

2. **Install dependencies**
\`\`\`bash
pnpm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your values
\`\`\`

4. **Start development server**
\`\`\`bash
pnpm dev
\`\`\`

5. **Open your browser**
\`\`\`
http://localhost:3000
\`\`\`

## 🔧 Environment Setup

### Required Variables
- `NEXTAUTH_SECRET` - 32+ character secret for session encryption
- `NEXTAUTH_URL` - Your application URL
- `NEXT_PUBLIC_APP_URL` - Public URL for client-side usage

### Optional Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SMTP_*` - Email configuration for notifications

See [Environment Setup Guide](docs/vercel-environment-setup.md) for detailed instructions.

## 🏗️ Project Structure

\`\`\`
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── admin/             # Admin dashboard
│   └── (pages)/           # Application pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── admin/            # Admin-specific components
├── lib/                  # Utility functions and configurations
├── docs/                 # Documentation
└── public/               # Static assets
\`\`\`

## 🎨 Design System

This project uses a comprehensive design system with:
- **Custom color palette** optimized for relationship-focused UI
- **Typography scale** with Inter font family
- **Component library** built on Radix UI primitives
- **Responsive design** with mobile-first approach

See [Design System Documentation](docs/design-system.md) for details.

## 🛠️ Development

### Available Scripts

\`\`\`bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm env:check    # Validate environment variables
\`\`\`

### Using v0 Design Mode

This project is optimized for v0 Design Mode editing. See [Design Mode Guide](docs/design-mode-guide.md) for:
- Component editing workflows
- Design system integration
- Best practices and tips

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - automatic on push to main branch

### Manual Deployment

\`\`\`bash
pnpm build
pnpm start
\`\`\`

## 🔍 Health Monitoring

Check application health and configuration:
\`\`\`
GET /api/health
\`\`\`

Returns:
- Environment validation status
- Configuration checks
- System health metrics

## 🧪 Testing

\`\`\`bash
pnpm test          # Run unit tests
pnpm test:watch    # Run tests in watch mode
pnpm test:e2e      # Run end-to-end tests (optional)
\`\`\`

## 📚 Documentation

- [Environment Setup](docs/vercel-environment-setup.md) - Complete environment configuration
- [Design System](docs/design-system.md) - Colors, typography, and components
- [Design Mode Guide](docs/design-mode-guide.md) - Using v0 Design Mode
- [Component Library](docs/components.md) - Available UI components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `docs/` directory
- **Health Check**: Visit `/api/health` on your deployment
- **Issues**: Open a GitHub issue for bugs or feature requests

## 🔗 Links

- **Production**: https://alignsynch.vercel.app
- **Staging**: https://alignsynch-git-develop.vercel.app
- **Design System**: https://alignsynch.vercel.app/design-system
