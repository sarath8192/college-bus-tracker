resource "local_file" "project_info" {
  filename = "${path.module}/project-info.txt"

  content = <<EOT
College Bus Tracking System

Infrastructure as Code Tool: Terraform

Project Components:
- Frontend: React.js + Vite
- Backend: Node.js + Express.js
- Database: Supabase PostgreSQL
- Frontend Deployment: Vercel
- Backend Deployment: Render
- Containerization: Docker and Docker Compose
- CI/CD: GitHub Actions
- Docker Registry: Docker Hub

Purpose:
This file is generated using Terraform to understand Infrastructure as Code basics.
EOT
}