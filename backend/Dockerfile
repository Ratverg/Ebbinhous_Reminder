# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-21-jammy AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Create the final lightweight image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Pulls the JAR from the build stage instead of your local PC
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-Xmx512m", "-Xss512k", "-jar", "app.jar"]