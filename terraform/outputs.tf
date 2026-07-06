output "project_name" {
  value = var.project_name
}

output "environment" {
  value = var.environment
}

output "generated_file" {
  value = local_file.project_info.filename
}