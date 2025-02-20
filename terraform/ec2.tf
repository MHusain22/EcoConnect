resource "aws_key_pair" "deployer" {
  key_name   = "terra-automate-key"
  public_key = file("C:/Azure/Project/EcoConnect/EcoConnect/terraform/terra-key.pub")
}

resource "aws_default_vpc" "default" {}

resource "aws_security_group" "allow_user_to_connect" {
  name        = "allow_user_connect_tls"  
  description = "Allow user to connect"
  vpc_id      = aws_default_vpc.default.id

  ingress {
    description = "port 22 allow"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "allow all outgoing traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "port 80 allow"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "port 443 allow"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "mysecurity"
  }
}

resource "aws_instance" "testinstance" {
  ami             = var.ami_id
  instance_type   = var.instance_type
  key_name        = aws_key_pair.deployer.key_name
  vpc_security_group_ids = [aws_security_group.allow_user_to_connect.id]  # Fixed reference

  tags = {
    Name = "MyProject"
  }

  root_block_device {
    volume_size = 30 
    volume_type = "gp3"
  }
}
