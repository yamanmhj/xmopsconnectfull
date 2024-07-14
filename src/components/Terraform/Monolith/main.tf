provider "aws" {
  region     = var.selectedregion //The region selected by the user 
  access_key = "AKIASJKLEJOS25HLWKN2"
  secret_key = "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"
}
resource "aws_s3_bucket" "monoliths3bucket2212" {
  bucket = "xmops-connect-monolith-s3-bucket-2212"
}

data "aws_ssm_parameter" "ami_id" {
  name = "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-ebs" // the OS Image selected by the user
}
resource "aws_key_pair" "wordpress_key" {
  key_name   = var.selectedkeypairoption // The KeyPair available and selected by the user ---------------------------
  public_key = file("/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Monolith/keypair_new.pub")

}


resource "aws_instance" "wordpress" {
  ami                         = data.aws_ssm_parameter.ami_id.value
  instance_type               = var.selectedec2InstanceType
  key_name                    = aws_key_pair.wordpress_key.key_name
  vpc_security_group_ids      = [aws_security_group.wordpress_sg.id]
  subnet_id                   = aws_subnet.public.id
  associate_public_ip_address = true

  root_block_device {
    volume_type           = "gp2"
    volume_size           = var.selectedstoragesize
    delete_on_termination = true
  }

  user_data = <<-EOF
                #!/bin/bash
                yum update -y
                amazon-linux-extras install -y lamp-mariadb10.2-php${var.selectedphpversion} php${var.selectedphpversion}
                yum install -y httpd mariadb-server
                systemctl start httpd
                systemctl enable httpd
                systemctl start mariadb
                mysql -e "CREATE DATABASE wordpress;"
                mysql -e "CREATE USER 'wordpress'@'localhost' IDENTIFIED BY 'password';"
                mysql -e "GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpress'@'localhost';"
                mysql -e "FLUSH PRIVILEGES;"
                cd /var/www/html
                wget https://wordpress.org/latest.tar.gz
                tar -xzf latest.tar.gz
                cp -r wordpress/* /var/www/html/
                chown -R apache:apache /var/www/html/*
                systemctl restart httpd
              EOF

  tags = {
    Name = "WordPress"
  }
}


output "wordpress_public_ip" {
  value = aws_instance.wordpress.public_ip
}

resource "aws_security_group" "wordpress_sg" {
  name        = "wordpress-sg"
  description = "Allow web traffic to WordPress"
  vpc_id      = aws_vpc.main.id

  ingress {                             //http
    from_port   = var.selectedsshoption // the value will be 22 when SSH radio is selected by the user
    to_port     = var.selectedsshoption
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {                             //ssh
    from_port   = var.selectedsshoption // the value will be 80 when HTTP radio is selected by the user
    to_port     = var.selectedsshoption
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "wordpress-sg"
  }
}


resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "MainVPC"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "MainInternetGateway"
  }
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

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = local.availability_zone_map[var.selectedregion] // this is to map the subnets based on the region selected by the user
  map_public_ip_on_launch = true

  tags = {
    Name = "PublicSubnet"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "PublicRouteTable"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

