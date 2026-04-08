# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy project files first for better Docker layer caching
COPY backend/VolunteerHub_Backend_V3-main/src/VolunteerHub.Web/VolunteerHub.Web.csproj src/VolunteerHub.Web/
COPY src/VolunteerHub.Infrastructure/VolunteerHub.Infrastructure.csproj src/VolunteerHub.Infrastructure/
COPY backend/VolunteerHub_Backend_V3-main/src/VolunteerHub.Application/VolunteerHub.Application.csproj src/VolunteerHub.Application/
COPY backend/VolunteerHub_Backend_V3-main/src/VolunteerHub.Domain/VolunteerHub.Domain.csproj src/VolunteerHub.Domain/
COPY backend/VolunteerHub_Backend_V3-main/src/VolunteerHub.Contracts/VolunteerHub.Contracts.csproj src/VolunteerHub.Contracts/

RUN dotnet restore src/VolunteerHub.Web/VolunteerHub.Web.csproj

# Copy source and publish
COPY . .
RUN dotnet publish src/VolunteerHub.Web/VolunteerHub.Web.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "VolunteerHub.Web.dll"]
