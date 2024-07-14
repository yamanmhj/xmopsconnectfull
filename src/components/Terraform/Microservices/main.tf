

# This is the provider
provider "aws" {
  region     = "us-west-2"
  access_key = ""
  secret_key = ""
}
#--------------------------------------------------------------------
# Define the VPC
resource "aws_vpc" "main_Microservice" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "Main_Microservice"
  }
}
#--------------------------------------------------------------------
# Create public subnets a
resource "aws_subnet" "public_a" {
  vpc_id            = aws_vpc.main_Microservice.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-west-2a"

  tags = {
    Name = "Public_Subnet_A"
  }

}

# Create private subnets for public subnet A
resource "aws_subnet" "private_a1" {
  vpc_id            = aws_vpc.main_Microservice.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "us-west-2a"

  tags = {
    Name = "Private_Subnet_a1"
  }
}

resource "aws_subnet" "private_a2" {
  vpc_id            = aws_vpc.main_Microservice.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "us-west-2a"

  tags = {
    Name = "Private_Subnet_a2"
  }
}
#--------------------------------------------------------------------
resource "aws_subnet" "public_b" {
  vpc_id            = aws_vpc.main_Microservice.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = "us-west-2b"

  tags = {
    Name = "Public_Subnet_B"
  }
}

# Create private subnets for public subnet B
resource "aws_subnet" "private_b1" {
  vpc_id            = aws_vpc.main_Microservice.id
  cidr_block        = "10.0.21.0/24"
  availability_zone = "us-west-2b"
  tags = {
    Name = "Private_Subnet_B1"
  }
}

resource "aws_subnet" "private_b2" {
  vpc_id            = aws_vpc.main_Microservice.id
  cidr_block        = "10.0.22.0/24"
  availability_zone = "us-west-2b"
  tags = {
    Name = "Private_Subnet_B2"
  }
}
# -------------------------------------------------------------------------

# Creating Internet gateaway

resource "aws_internet_gateway" "intgw" {
  vpc_id = aws_vpc.main_Microservice.id

  tags = {
    Name = "Internet Gateway"
  }
}
# -----------------------------------------------------------------

# Creating Route Table for public Subnets

# route table for first public_a-------------
resource "aws_route_table" "public_a" {
  vpc_id = aws_vpc.main_Microservice.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.intgw.id
  }

  tags = {
    Name = "Route_Table_Public_A"
  }
}
resource "aws_route_table_association" "public_a_subnet_association" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public_a.id
}

# route table for second public_b  subnet-------------------
resource "aws_route_table" "public_b" {
  vpc_id = aws_vpc.main_Microservice.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.intgw.id
  }
  tags = {
    Name = "Route_Table_Public_B"
  }
}
resource "aws_route_table_association" "public_b_subnet_association" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public_b.id
}
#------------------------------------------------------------------------------
# Creating and connecting Nat gateaways to public subnetsand elastic IPS for private subnets
resource "aws_eip" "natgate_a" {

}

resource "aws_nat_gateway" "natgate_a" {
  allocation_id = aws_eip.natgate_a.id
  subnet_id     = aws_subnet.public_a.id
  tags = {
    Name = "NatGateway_A"
  }
}
resource "aws_eip" "natgate_b" {

}


resource "aws_nat_gateway" "natgate_b" {
  allocation_id = aws_eip.natgate_b.id
  subnet_id     = aws_subnet.public_b.id
  tags = {
    Name = "NatGateway_B"
  }
}

#------------------------------------------------------------------------------

#Create Route Table for private subnets
# for private subnet a1-------------
resource "aws_route_table" "private_a1" {
  vpc_id = aws_vpc.main_Microservice.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgate_a.id
  }
}
resource "aws_route_table_association" "public_a1_route_subnet_association" {
  subnet_id      = aws_subnet.private_a1.id
  route_table_id = aws_route_table.private_a1.id
}
#for private subnet a2-----------------------

resource "aws_route_table" "private_a2" {
  vpc_id = aws_vpc.main_Microservice.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgate_a.id
  }
}
resource "aws_route_table_association" "public_a2_route_subnet_association" {
  subnet_id      = aws_subnet.private_a2.id
  route_table_id = aws_route_table.private_a2.id
}

# for private subnet b1-------------
resource "aws_route_table" "private_b1" {
  vpc_id = aws_vpc.main_Microservice.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgate_b.id
  }
}
resource "aws_route_table_association" "public_b1_route_subnet_association" {
  subnet_id      = aws_subnet.private_b1.id
  route_table_id = aws_route_table.private_b1.id
}

#for private subnet a2-----------------------
resource "aws_route_table" "private_b2" {
  vpc_id = aws_vpc.main_Microservice.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.natgate_b.id
  }
}
resource "aws_route_table_association" "public_b2_route_subnet_association" {
  subnet_id      = aws_subnet.private_b2.id
  route_table_id = aws_route_table.private_b2.id
}

#-------------------------------------------------
#Launching EC2 instance for WordPress

resource "aws_instance" "wordpress_instance_a1" {
  ami                         = "ami-08f7912c15ca96832"
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.private_a1.id
  security_groups             = [aws_security_group.wordpress_security_group.id]
  associate_public_ip_address = true

  tags = {
    Name = "WordPress_Instance_private_A1"
  }
}

resource "aws_instance" "wordpress_instance_b1" {
  ami                         = "ami-08f7912c15ca96832"
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.private_b1.id
  security_groups             = [aws_security_group.wordpress_security_group.id]
  associate_public_ip_address = true

  tags = {
    Name = "WordPress_Instance_private_B1"
  }
}
#----------------------------------------
#Create a security group for wordpress
resource "aws_security_group" "wordpress_security_group" {
  vpc_id = aws_vpc.main_Microservice.id

  # Allow inbound traffic on port 80 for HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Add more rules as needed for your specific requirements
}


#--------------------------------------------------------------------------------------

# Creating RDS instance for WordPress in private subnets private_a2 and private_b2

resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "rds-subnet-group"
  subnet_ids = [aws_subnet.private_a2.id, aws_subnet.private_b2.id]
}

# RDS Instance A
resource "aws_db_instance" "rds_instance_a" {
  engine                    = "mysql"
  engine_version            = "5.7"
  skip_final_snapshot       = true
  final_snapshot_identifier = "my-final-snapshot-a"
  instance_class            = "db.t2.micro"
  allocated_storage         = 20
  identifier                = "my-rds-instance-a"
  db_name                   = "wordpress_db_a"
  username                  = "admin_a"
  password                  = "admin_a_password"
  db_subnet_group_name      = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids    = [aws_security_group.wordpress_security_group.id]

  tags = {
    Name = "RDS Instance A"
  }
}

# RDS Instance B
resource "aws_db_instance" "rds_instance_b" {
  engine                    = "mysql"
  engine_version            = "5.7"
  skip_final_snapshot       = true
  final_snapshot_identifier = "my-final-snapshot-b"
  instance_class            = "db.t2.micro"
  allocated_storage         = 20
  identifier                = "my-rds-instance-b"
  db_name                   = "wordpress_db_b"
  username                  = "admin_b"
  password                  = "admin_b_password"
  db_subnet_group_name      = aws_db_subnet_group.rds_subnet_group.name
  vpc_security_group_ids    = [aws_security_group.wordpress_security_group.id]

  tags = {
    Name = "RDS Instance B"
  }
}
