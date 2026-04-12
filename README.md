# BookFinder

A communty-driven local marketpalce for buying and selling used books. Connect with readers nearby - list a book in under 2 minutes, find a specfifc title from someone down the road.

## Project status
🚧 In active development

## Tech stack
| Layer | Technology |
|-------|-----------|
| Mobile | React Native |
| Backend API | Node.js + Express |
| Database | PostgreSQL |
| Cloud | AWS (EC2, RDS, S3) |
| Infrastructure | Terraform |
| CI/CD | GitHub Actions |
| Containers | Docker + Kubernetes |

## Local development setup

### Prerequisites
- Node.js 20+
- Docker Desktop
- Git

### Run locally
git clone https://github.com/YOUR_USERNAME/bookfinder.git
cd bookfinder/backend
cp .env.example .env        # fill in your values
npm install
npm run dev

## Repo structure
bookfinder/
├── backend/     Node.js REST API
├── mobile/      React Native app
├── infra/       Terraform infrastructure
└── docs/        Architecture decisions

## Roadmap
- [x] Phase 1 — Foundation & repo setup
- [ ] Phase 2 — Backend API
- [ ] Phase 3 — Containerisation
- [ ] Phase 4 — CI/CD pipeline
- [ ] Phase 5 — AWS deployment
- [ ] Phase 6 — Infrastructure as Code
- [ ] Phase 7 — Kubernetes
- [ ] Phase 8 — Monitoring