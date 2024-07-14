variable "selectedec2InstanceType" {
  type        = string
  description = "This is the instance selected by the user"
  default     = "t1.micro"
}

variable "selectedregion" {
  type        = string
  description = "This is the region selected by the user"
  default     = "us-east-1"
}

variable "selectedrdsDBType" {
  type        = string
  description = "This is the RDS DB type selected by the user"
  default     = ""
}

variable "selectedsshoption" {
  type        = string
  description = "This is the SSH option selected by the user"
  default     = "22"
}

variable "selectedkeypairoption" {
  type        = string
  description = "This is the SSH key pair option selected by the user"
  default     = "80"
}

variable "selectedphpversion" {
  type        = string
  description = "This is the PHP version selected by the user"
  default     = "7.1"
}

variable "selectedstoragesize" {
  type        = string
  description = "This is the storage size selected by the user"
  default     = "20"
}
