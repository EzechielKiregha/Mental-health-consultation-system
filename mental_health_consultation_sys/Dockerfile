# Multi-stage Dockerfile for building and running the Spring Boot app
# - Uses Maven with Java 21 for the build stage
# - Uses a small Java 21 runtime image for the final image
# - Copies the fat jar produced by Spring Boot and runs it as a non-root user

FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /workspace

# Copy only what we need to download dependencies first (speeds up rebuilds)
COPY pom.xml mvnw ./
RUN chmod +x mvnw && mvn -B dependency:go-offline -DskipTests

# Copy source and build
COPY src ./src
RUN mvn -B package -DskipTests -DskipITs

# Runtime image
FROM eclipse-temurin:21-jre-jammy AS runtime

# Create non-root user 'app'
RUN groupadd -r app && useradd -r -g app app || true

WORKDIR /app

# Copy the built jar (spring-boot-maven-plugin produces one executable jar under target)
COPY --from=build /workspace/target/*.jar app.jar
RUN chown -R app:app /app

USER app

# JVM tuning via environment variable
ENV JAVA_OPTS="-Xms256m -Xmx512m -Dspring.profiles.active=prod"

# Expose Spring Boot default port
EXPOSE 8080

# Healthcheck (optional): requires actuator on /actuator/health
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
