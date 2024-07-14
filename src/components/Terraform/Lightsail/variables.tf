variable "selectedregion" {
  type        = string
  description = "This is the region selected by the user"
  default     = ""
}

variable "selectedkeypairoption" {
  type        = string
  description = "This is the SSH key pair option selected by the user"
  default     = "keypair"
}

variable "selectedbundleID" {
  type        = string
  description = "This is the bundle ID"
  default     = ""
}

variable "selectedbluprintID" {
  type        = string
  description = "This is the blue print ID"
  default     = ""
}
