output "instance_public_ip" {
  description = "Public IP address of EC2 instance"
  value       = aws_instance.app_server.public_ip
}

output "frontend_url" {
  description = "Frontend URL"
  value       = "http://${aws_instance.app_server.public_ip}"
}

output "backend_url" {
  description = "Backend API URL"
  value       = "http://${aws_instance.app_server.public_ip}:5000"
}