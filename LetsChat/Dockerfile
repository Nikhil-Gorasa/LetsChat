# Use OpenJDK 21 for both building and running the application
FROM openjdk:21-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files
COPY LetsChat/src ./src
COPY LetsChat/pom.xml ./pom.xml
COPY LetsChat/mvnw ./mvnw
COPY LetsChat/.mvn ./.mvn

# Make the mvnw script executable
RUN chmod +x mvnw

# List contents after copying source
RUN ls -la

# Build the application
RUN ./mvnw package -DskipTests

# Make port 9090 available to the world outside this container
EXPOSE 9090

# Run the jar file 
ENTRYPOINT ["java", "-jar", "/app/target/LetsChat-0.0.1-SNAPSHOT.jar"]