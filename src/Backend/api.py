import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from python_terraform import Terraform
import boto3





app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///s3_logs.db'  # SQLite database file
db = SQLAlchemy(app)

AWS_ACCESS_KEY_ID = ''
AWS_SECRET_ACCESS_KEY = ''
AWS_REGION = 'us-east-1'
S3_BUCKET_NAME = 'xmopconnectcloudtrails3'

def update_Monolith_tfvars(selectedregion, selectedec2InstanceType, selectedrdsDBType, selectedsshoption, selectedkeypairoption, selectedphpversion, selectedstoragesize):
    UserSelectedtf_vars = {  # GAINED THIS FROM THE FRONT END
        
        'selectedregion': selectedregion,
        'selectedec2InstanceType': selectedec2InstanceType,
        'selectedrdsDBType': selectedrdsDBType,
        'selectedsshoption': selectedsshoption,
        'selectedkeypairoption': selectedkeypairoption,
        'selectedphpversion': selectedphpversion,
        'selectedstoragesize': selectedstoragesize
    }

    print("the configuration selected by users are:------->", UserSelectedtf_vars)

    tfvars_file_path = '/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Monolith/terraform.tfvars'

    with open(tfvars_file_path, 'r') as file:  #opens the TF VARIABLE FILES file in read mode and reads all its line in a list called code
        tfvar_readVariables = file.readlines()
        print("the original/default tf values are:---------> ", tfvar_readVariables)

    updated_Code_in_tfVars = []   # this is an empty list that stores the updated variable values in tfvars file.
    for code in tfvar_readVariables:
        for var_name, var_value in UserSelectedtf_vars.items():
            if code.startswith(var_name):
                code = f"{var_name} = \"{var_value}\"\n"
        updated_Code_in_tfVars.append(code)

    with open(tfvars_file_path, 'w') as file:
        file.writelines(updated_Code_in_tfVars)

        print("the updated values of tf with scripts are:------------>", updated_Code_in_tfVars)

      


        

def implement_Terraform_Architecture(architecture):
    if architecture == "monolith":
        print("Creating The architecture")
        tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Monolith")
        print(tf)
    # Initialize Terraform working directory
        tf.init()
        tf.show()
    # Generate Terraform execution plan
        tf.plan()
        tf.show()
             # Apply Terraform changes
        tf.apply(skip_plan=True)
        tf.show()
    # Get Terraform output
        output = tf.output()

        print(output)

    elif architecture == "highlyavailable":
        print("Creating The architecture")
        tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Microservices")
        print(tf)
    # Initialize Terraform working directory
        tf.init()
        tf.show()
    # Generate Terraform execution plan
        tf.plan()
        tf.show()
             # Apply Terraform changes
        tf.apply(skip_plan=True)
        tf.show()
    # Get Terraform output
        output = tf.output()

        print(output)

    elif architecture == "lightsail":
        print("Creating The architecture")
        tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Lightsail")
        print(tf)
    # Initialize Terraform working directory
        tf.init()
        tf.show()
    # Generate Terraform execution plan
        tf.plan()
        tf.show()
             # Apply Terraform changes
        tf.apply(skip_plan=True)
        tf.show()
    # Get Terraform output
        output = tf.output()

        print(output)
    else:
        print(f"Unsupported architecture: {architecture}")



@app.route('/api/MonolithSubmitForm', methods=['POST'])  # get the monolithic elements from the user through POST
def submit_form():
    try:
        # Retrieve JSON data from request
        data = request.json
        
        # Extract individual form fields
        selectedregion = data.get('selectedregion')
        selectedec2InstanceType = data.get('selectedec2InstanceType')
        selectedrdsDBType = data.get('selectedrdsDBType')
        selectedsshoption = data.get('selectedsshoption')
        selectedkeypairoption = data.get('selectedkeypairoption')
        selectedphpversion = data.get('selectedphpversion')
        selectedstoragesize = data.get('selectedstoragesize')
        
        print("received region from user in monolith backend:----", selectedregion)
        print("received instance from user in monolith backend:----", selectedec2InstanceType)
        print("received rds from user in monolith backend: ----", selectedrdsDBType)

        update_Monolith_tfvars(selectedregion, selectedec2InstanceType, selectedrdsDBType, selectedsshoption, selectedkeypairoption, selectedphpversion, selectedstoragesize)
        implement_Terraform_Architecture('monolith')
        return jsonify({"message": "Form data received successfully", "data": data}), 200

    except Exception as e:
        # Handle exception
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/GetLightsailelements',methods=['GET'])

def get_lightsail():
    try:
        # Initialize Lightsail client
        

        lightsail_client = boto3.client('lightsail',
                                        aws_access_key_id=AWS_ACCESS_KEY_ID,
                                        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                                        region_name=AWS_REGION
                                        )

        # Describe Lightsail regions
        regions = [region['name'] for region in lightsail_client.get_regions()['regions']]

        # Describe Lightsail instance types (bundles)
        instance_types = lightsail_client.get_instance_types()['instanceTypes']
        bundles = [{'label': instance['name'], 'value': instance['bundleId']} for instance in instance_types]

        # Describe Lightsail instance blueprints
        blueprints = [{'label': blueprint['blueprintName'], 'value': blueprint['blueprintId']} for blueprint in lightsail_client.get_blueprints()['blueprints']]

        # Describe Lightsail key pairs
        key_pairs = [key_pair['name'] for key_pair in lightsail_client.get_key_pairs()['keyPairs']]

        instance_types = lightsail_client.get_instance_types()['instanceTypes']
        
        # Get all available bundles
        bundles = [{'label': instance['name'], 'value': instance['bundleId']} for instance in instance_types]

        return jsonify(bundles), 200
     
        # aws_options = {
        #     #'RegionsOptions': regions,
        #     #'InstanceOptions': h,
        #  #'keypairOptions': bundles,
        #    # 'BluePrintOptions': blueprints,
        #     'BundleOptions': bundles,
        # }

        return jsonify(aws_options), 200
    
    except Exception as e:
        return jsonify({"error couldnt retrieve data": str(e)}), 500




@app.route('/api/GetMonolithicelements', methods=['GET'])
def get_Monolithicelements():
    try:
        # Initialize RDS client
        rds_client = boto3.client('rds',
                                  aws_access_key_id=AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                                  region_name=AWS_REGION
                                  )

        # Initialize EC2 client
        ec2_client = boto3.client('ec2',
                                  aws_access_key_id=AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                                  region_name=AWS_REGION
                                  )

        # Describe EC2 regions
        regions = [region['RegionName'] for region in ec2_client.describe_regions()['Regions']]
        for region in regions:
            print(region)
        

        # Describe EC2 instance types
        instance_types = [{'label': instance['InstanceType'], 'value': instance['InstanceType']} for instance in ec2_client.describe_instance_types()['InstanceTypes']]
        instance_types = sorted(instance_types, key=lambda x: x['label'])



        # Fetch the database engine versions
        db_versions = rds_client.describe_db_engine_versions()['DBEngineVersions']
        db_engines_versions = [{'label': db_engine['Engine'], 'value': db_engine['Engine'], 'version': db_engine['EngineVersion']} for db_engine in db_versions]
        db_engines = sorted(db_engines_versions, key=lambda x: x['label'])

          


        # Extract key names
    

        key_pairs = ec2_client.describe_key_pairs()['KeyPairs']
        key_names = [{'label': key_pair['KeyName'], 'value': key_pair['KeyName']} for key_pair in key_pairs]
        for key in key_names:
            print (key)

        aws_options = {
            'RegionsOptions': regions,
            'EC2InstanceTypeOptions': instance_types,
            'RDSDBTypeOptions': db_engines,
            'KeyPairOptions': key_names
        }
        print(db_engines)
           
        return jsonify(aws_options), 200
    
    except Exception as e:
        return jsonify({"error couldnt retrieve data": str(e)}), 500





@app.route('/api/cloudtraillogs', methods = ['GET'])
# def get_instance_creation_logs():
#     try:
#         # Configure your AWS credentials and region here

#         # Create an S3 client
#         s3_cloudtrail = boto3.client('s3',
#                                      aws_access_key_id=AWS_ACCESS_KEY_ID,
#                                      aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
#                                      region_name=AWS_REGION)

#         # List objects (log files) in the CloudTrail S3 bucket
#         response = s3_cloudtrail.list_objects_v2(Bucket=S3_BUCKET_NAME)

#         # Extract log file names from the response
#         log_file_keys = [obj['Key'] for obj in response.get('Contents', [])]

#         # Initialize a list to store instance creation events
#         instance_creation_events = []

#         # Iterate through each log file and filter instance creation events
#         for log_file_key in log_file_keys:
#             # Download the log file content
#             log_file_object = s3_cloudtrail.get_object(Bucket=S3_BUCKET_NAME, Key=log_file_key)
#             log_file_content = log_file_object['Body'].read().decode('utf-8')

#             # Parse log file content and filter instance creation events
#             for event in log_file_content.split('\n'):
#                 if 'RunInstances' in event:  # Filter events related to EC2 instance creation
#                     instance_creation_events.append(event)

#         return jsonify({'instance_creation_events': instance_creation_events}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

def get_deployment_logs():

    try:
        s3_cloudtrail = boto3.client('s3',
                                     aws_access_key_id=AWS_ACCESS_KEY_ID,
                                     aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                                     region_name=AWS_REGION)

        response = s3_cloudtrail.list_objects_v2(Bucket=S3_BUCKET_NAME)

        logs = [obj['Key'] for obj in response.get('Contents', [])]

       # Initialize an empty list to store the object keys


        return jsonify({'logs': logs})
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@app.route('/api/monolith', methods = ['POST'])
def monolith():
    # Initialize Terraform object
    print("Creating The architecture")
    tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Monolithic")
    print(tf)
#     # Initialize Terraform working directory
    tf.init()
    tf.show()
#     # Generate Terraform execution plan
    tf.plan()
    tf.show()
#     # Apply Terraform changes
    tf.apply(skip_plan=True)
    tf.show()
#     # Get Terraform output
    output = tf.output()

    print(output)
    
    # Return JSON response
    return jsonify({'message': "Monolith Architecture created"})

@app.route('/api/monolithdestroy', methods = ['POST'])
def monolithdestroy():
    tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Monolithic")
    tf.destroy()
    print(tf.show())

    return jsonify({'message':"Monolith architecture destroyed"})

@app.route('/api/microservice', methods = ['POST'])
def microservice():
    # Initialize Terraform object
    tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Microservices")
    print(tf)
#     # Initialize Terraform working directory
    tf.init()

#     # Generate Terraform execution plan
    tf.plan()

#     # Apply Terraform changes
    tf.apply(skip_plan=True)

#     # Get Terraform output
    output = tf.output()
    
    return jsonify({'message':"Monolith architecture created"})

@app.route('/api/microservicedestroy', methods = ['POST'])
def microservicedestroy():
    tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/Microservices")
    tf.destroy()
    output = tf.output()

    return jsonify({'message':"Monolith architecture destroyed"})

  

@app.route('/api/lightsaildestroy', methods = ['POST'])
def lightsaildestroy():
     tf = Terraform(working_dir= "/Users/yamanmaharjan/Documents/xmopsprojectmain/src/components/Terraform/lightsail")
     tf.destroy()
     tf.show()
     output = tf.output()

     return jsonify({'message':"lightsail architecture destroyed"})




if __name__ == '__main__':
    app.run(debug=True)



