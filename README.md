## Overview

Helios' user interface is built with [React](https://reactjs.org/),
[React Router](https://reactrouter.com/en/main), [Tailwind](https://tailwindcss.com/),
[TypeScript](https://www.typescriptlang.org/), [Zod](https://github.com/colinhacks/zod) and [Vite](https://vitejs.dev/).

## Features

### SQL Console

The SQL Console provides users with an interactive environment to write and execute SQL queries against their Kinesis stream data. It features a code editor with syntax highlighting for SQL and users can execute queries with a single click and view results in a tabular format. Users can download the results of any SQL query as a CSV file. The CSV export feature ensures that insights gained from Helios can be easily shared and incorporated into broader analytical processes.

![SQL Console](https://github.com/helios-pipeline/case-study/blob/main/docs/public/case_study/webapp.png)

### Data Source Connection

Helios simplifies the process of connecting to existing Amazon Kinesis streams. Through an intuitive interface, users can input their AWS credentials and select the Kinesis streams they wish to analyze. This feature acts as a bridge between the user's AWS infrastructure and Helios, enabling seamless data flow for analysis. It's important to note that Helios does not manage or modify the Kinesis streams themselves; it simply provides a read-only connection for data analysis purposes.

![Data Source Connection](https://github.com/helios-platform/helios-platform.github.io/blob/main/docs/public/add_data_source.png)

### Quarantine Table

The Quarantine Table is a crucial component for data quality management in Helios. It provides a dedicated space to view and analyze events that failed to process correctly. Users can examine the details of these problematic events, including the nature of the error and the original event data. The Quarantine Table also supports exporting of error data to a CSV for offline analysis or reporting.

![Quarantine Table](https://github.com/helios-platform/helios-platform.github.io/blob/main/docs/public/quarantine_table.png)
