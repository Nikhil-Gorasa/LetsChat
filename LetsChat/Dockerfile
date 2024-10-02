FROM openjdk:21-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files
COPY src ./src
COPY pom.xml ./pom.xml
COPY mvnw ./mvnw
COPY .mvn ./.mvn

# Make the mvnw script executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw package -DskipTests

# Make port 9090 available to the world outside this container
EXPOSE 9090

# Run the jar file 
ENTRYPOINT ["java", "-jar", "/app/target/LetsChat-0.0.1-SNAPSHOT.jar"]