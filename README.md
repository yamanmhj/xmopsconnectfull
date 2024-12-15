# AWS Architecture Deployment Manager

This project is a **React** and **Flask** application that facilitates deploying **customizable cloud architectures** on AWS. The primary goal of this project is to provide an intuitive interface for users to define their requirements and deploy **Microservice**, **Monolithic**, or **Lightsail** architectures to host a WordPress website. By leveraging **Terraform**, this application enables a dynamic, user-driven approach to infrastructure deployment while maintaining flexibility and scalability.

The project exemplifies modern DevOps principles by integrating Infrastructure-as-Code (IaC), cloud automation, and user-driven configuration management.

---

## Nature of the Project

### Purpose
The core aim of this project is to simplify the process of deploying AWS resources. Hosting a WordPress website requires specific configurations, and this project automates the setup by allowing users to:

1. **Select architectural styles**:
   - **Microservice**: Deploys multiple interconnected services for WordPress, such as separate EC2 instances for the application and database.
   - **Monolithic**: A single EC2 instance hosting both the application and database.
   - **Lightsail**: A cost-effective, simplified deployment for WordPress using AWS Lightsail.

2. **Customize deployment configurations**:
   - Define EC2 instance types, database engines, OS images, storage sizes, and more.
   - Select regions and security settings based on user preferences.

### How It Works
- **Frontend (React)**: Provides an interactive UI where users can select their deployment preferences.
  - Example inputs:
    - Architecture type
    - AWS region
    - EC2 instance type
    - RDS database engine
    - PHP version
    - Security group and storage settings
  - User selections are dynamically updated in Terraform `.tfvars` files via the backend.

- **Backend (Flask)**: Handles user input, dynamically modifies Terraform files, and triggers Terraform commands to provision the infrastructure.

- **Terraform Integration**: Automates the deployment of AWS resources based on user configurations.

- **AWS Cognito**: Provides user authentication and ensures secure access to the deployment tool.

- **AWS CloudTrail**: Monitors and logs user activities for auditing and troubleshooting.

---

## Features

### Key Capabilities
1. **Dynamic Infrastructure Deployment**:
   - Modify Terraform files in real time based on user input.
   - Deploy scalable architectures efficiently.

2. **Architecture Types**:
   - **Microservice**: Independent EC2 instances for application and database.
   - **Monolithic**: All-in-one EC2 instance.
   - **Lightsail**: Simplified deployment using AWS Lightsail for WordPress hosting.

3. **User-Driven Configuration**:
   - Select regions, EC2 instance types, database types, and storage sizes.
   - Define PHP versions and security groups.

4. **Authentication and Monitoring**:
   - Secure login with AWS Cognito.
   - Activity tracking with AWS CloudTrail.

### Example User Input
React’s `useState` hooks are used to capture user preferences. For instance:
```javascript
const [selectedOption, setSelectedOption] = useState('');
const [selectedPortValue, setSelectedPortValue] = useState('');
const [PopupRegion, popupsetRegion] = useState(''); // AWS Region
const [PopupOSImage, popupsetOSImage] = useState(''); // OS Image
const [PopupEC2, popupsetEC2] = useState(''); // EC2 Instance Type
const [PopupKeyPair, popupsetkeyPair] = useState(''); // Key Pair
These inputs update Terraform variables such as:

selectedregion = "us-east-1"
selectedec2InstanceType = "t1.micro"
selectedrdsDBType = "aurora-mysql"
selectedsshoption = "22"
selectedkeypairoption = "None"
selectedphpversion = "8.0"
selectedstoragesize = "20"
Prerequisites
Frontend
Node.js and npm installed.
Install dependencies:
bash
Copy code
npm install
Backend
Python 3.7+ installed.
Install required Python packages:
bash
Copy code
pip install -r requirements.txt
AWS
AWS account with permissions for EC2, RDS, Lightsail, Cognito, and CloudTrail.
Terraform installed.
Running the Application
Frontend
Start the React application:

bash
Copy code
npm run
Backend
Start the Flask server:

bash
Copy code
python3 backend.py
Deploy AWS Resources
Once configurations are updated, execute the Terraform commands:

Initialize Terraform:
bash
Copy code
terraform init
Plan the deployment:
bash
Copy code
terraform plan
Apply the deployment:
bash
Copy code
terraform apply
Project Structure
markdown
Copy code
- frontend/                  # React application
  - src/
    - components/
      - App.js
      - UserInputForm.js
      - ConfigurationManager.js
    - styles/
      - App.css
- backend/                   # Flask application
  - app/
    - backend.py
    - api/
      - routes.py
    - services/
      - terraform_manager.py
- terraform/                 # Terraform configuration files
  -microservic
  -monolith
    - main.tf
    -terraform.tfvars
    -variables.tf
  -lightsail
- aws_integration/           # AWS-specific configurations
  - cognito/
  - cloudtrail/
Work in Progress
This project is still under development. Future updates will include:

Complete AWS CloudTrail integration for enhanced monitoring.
Optimization of Terraform scripts for more robust deployments.
Improved user interface for better configuration selection.
Technologies Used
Frontend: React.js
Backend: Flask
Cloud Services:
AWS EC2
AWS RDS
AWS Lightsail
AWS Cognito
AWS CloudTrail
Infrastructure as Code: Terraform
Contributing
Contributions are welcome! Please submit issues or pull requests to suggest improvements or new features.

Author
This project is a Work in Progress. Feel free to collaborate or reach out for more information!

vbnet
Copy code

Feel free to copy and use it directly for your GitHub repository! Let me know if you need additional edits.





