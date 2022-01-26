# sql-to-s3-athena

# Push MySQL Data to AWS S3 + Athena for Metabase insights

### Please create a .env file with valid credentials.

## How It Works

<ol>
  <li>
    Execute <code>SHOW TABLES;</code> to get list of all tables in selected database.
  </li>
  <li>
    <code>SELECT * FROM</code> each of the tables in above list.
  </li>
  <li>
    Store table-wise json files (as per the format <a href="https://stackoverflow.com/questions/42034094/store-multiple-elements-in-json-files-in-aws-athena">required by AWS Athena</a>) in a temporary folder (named <code>data</code>)
  </li>
  <li>
    Push stored files to S3.
  </li>
  <li>
    Delete the temporary folder with its contents.
  </li>
  <li>
    Repair the tables created in AWS Athena.
  </li>
</ol>

#### Note: Variable names used are listed in .env.sample

## How to Setup S3 and Athena

1. Create an S3 bucket with the name *S3_BUCKET* and region *S3_REGION*
2. Create a folder named ***query-result*** inside the root folder of the bucket, with the absolute path as *ATHENA_OUTPUT_LOCATION*
3. Recommended: use Athena **old console**
4. For creating new Athena DB, make sure region is same as *S3_REGION*
5. Connect Data Source → S3, Glue → Create New Database (name should be *ATHENA_DB*) → Create Table in Athena → Add columns of any one table with datatype
6. Run all `CREATE EXTERNAL TABLE` queries linking each table's location to `s3://<S3_BUCKET>/<TABLE_NAME>`.
* It is imperative that each folder corresponding to a table has the absolute path `s3://<S3_BUCKET>/<TABLE_NAME>`.

## [How to integrate AWS Athena with Metabase](https://github.com/dacort/metabase-athena-driver)
