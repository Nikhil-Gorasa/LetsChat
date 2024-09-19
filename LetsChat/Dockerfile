FROM maven:3.8.4-openjdk-21 AS build

COPY . .

RUN mvn clean package -DskipTests



FROM openjdk:21-jdk-alpine

COPY --from=build /target/LetsChat-0.0.1-SNAPSHOT.jar LetsChat.jar

EXPOSE 9090

ENTRYPOINT ["java", "-jar", "LetsChat.jar"]
