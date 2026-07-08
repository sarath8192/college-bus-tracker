variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource names"
  type        = string
  default     = "college-bus-tracker"
}

variable "instance_type" {
  description = "EC2 instance type. Use micro instance for low-cost/free-tier-style testing."
  type        = string
  default     = "t3.micro"
}

variable "backend_image" {
  description = "Docker Hub backend image"
  type        = string
  default     = "sarath1236/college-bus-backend:v1"
}

variable "frontend_image" {
  description = "Docker Hub frontend image"
  type        = string
  default     = "sarath1236/college-bus-frontend:v1"
}

variable "ssh_cidr" {
  description = "Your IP address for SSH access. Example: 49.207.10.20/32"
  type        = string
  default     = "0.0.0.0/0"
}