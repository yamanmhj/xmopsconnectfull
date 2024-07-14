provider "aws" {
  region = var.selectedregion

}

resource "aws_lightsail_key_pair" "wordpressKey" {
  name       = "my-lightsail-key"
  public_key = file("${path.module}/wordpressKey.pub")
}

locals { //This is to map the subnets based on what region the user selectes in the front end
  // THIS IS internal so it doesnot need to be added in the other files.
  availability_zone_map = {
    "us-east-1"      = "us-east-1a"
    "us-east-2"      = "us-east-2a"
    "us-west-1"      = "us-west-1b" # Updated AZ to us-west-1b
    "us-west-2"      = "us-west-2a"
    "af-south-1"     = "af-south-1a"
    "ap-east-1"      = "ap-east-1a"
    "ap-south-1"     = "ap-south-1a"
    "ap-northeast-3" = "ap-northeast-3a"
    "ap-northeast-2" = "ap-northeast-2a"
    "ap-southeast-1" = "ap-southeast-1a"
    "ap-southeast-2" = "ap-southeast-2a"
    "ap-northeast-1" = "ap-northeast-1a"
    "ca-central-1"   = "ca-central-1a"
    "eu-central-1"   = "eu-central-1a"
    "eu-west-1"      = "eu-west-1a"
    "eu-west-2"      = "eu-west-2a"
    "eu-south-1"     = "eu-south-1a"
    "eu-west-3"      = "eu-west-3a"
    "eu-north-1"     = "eu-north-1a"
    "me-south-1"     = "me-south-1a"
    "sa-east-1"      = "sa-east-1a"
  }
}

resource "aws_lightsail_instance" "my_wordpress_instance" {
  name              = "MyWordPressInstance"
  availability_zone = local.availability_zone_map[var.selectedregion]
  blueprint_id      = var.selectedbluprintID
  bundle_id         = var.selectedbundleID
  key_pair_name     = aws_lightsail_key_pair.wordpressKey.name

  tags = {
    Name = "MyWordPressInstance"
  }
}

output "wordpress_instance_public_ip" {
  value       = aws_lightsail_instance.my_wordpress_instance.public_ip_address
  description = "The public IP address of the WordPress Lightsail instance."
}
