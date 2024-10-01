# Use OpenJDK 21 for both building and running the application
FROM openjdk:21-slim

# Set the working directory in the container
WORKDIR /app

# List contents of the current directory
RUN ls -la

# Copy the Maven wrapper and pom.xml file
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# List contents after copying Maven files
RUN ls -la

# Copy the project source
COPY src ./src

# List contents after copying source
RUN ls -la

# Build the application
RUN ./mvnw package -DskipTests

# Make port 9090 available to the world outside this container
EXPOSE 9090

# Run the jar file 
ENTRYPOINT ["java","-jar","/app/target/LetsChat-0.0.1-SNAPSHOT.jar"]