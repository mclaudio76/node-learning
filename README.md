# node-learning
Some simple experiments with node.js and Typescript language.

# nodeREST
Playing with REST, MySQL and Typescript.
A simple project with a class, RESTServer, acting as helper to expose some REST services (via GET). To make things a bit more complex, the project provides a simple SQLQuery class as query helper, using a "fluent" API; this class is used to access an instance of MySQL server for performing a query, whose results are returned to the caller in JSON format.

# Enviroment setup.

You need to install Express Framework, Typescript and needed type definitions.

To install typescript:</p>
<b>sudo npm install typescript@next -g </b>
</p>
To install node.js and Express Typescript type definitions, run inside the folder where you have copied source files 
the following commands:
</p>
<b>typings install env~node@4.0.0 --save --global </b> </p>
<b>typings install express </b>





