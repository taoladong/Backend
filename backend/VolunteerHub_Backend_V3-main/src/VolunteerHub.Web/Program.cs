using Microsoft.EntityFrameworkCore;
using VolunteerHub.Infrastructure;
using VolunteerHub.Infrastructure.Persistence;
using VolunteerHub.Web.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var configuredOrigins = builder.Configuration["Cors:AllowedOrigins"]
    ?.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
    ?? Array.Empty<string>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        if (configuredOrigins.Length > 0)
        {
            policy.WithOrigins(configuredOrigins);
        }
        else
        {
            policy.WithOrigins("http://localhost:5173", "https://frontend-blush-nine-38.vercel.app");
        }

        policy.SetIsOriginAllowed(origin =>
        {
            if (configuredOrigins.Any(x => x.Equals(origin, StringComparison.OrdinalIgnoreCase)))
            {
                return true;
            }

            if (origin.StartsWith("http://localhost:", StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }

            return origin.EndsWith(".vercel.app", StringComparison.OrdinalIgnoreCase);
        });

        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await dbContext.Database.MigrateAsync();
}

await VolunteerHub.Infrastructure.Seed.RoleSeeder.SeedAsync(app.Services);
await VolunteerHub.Infrastructure.Persistence.Seeding.BadgeSeeder.SeedAsync(app.Services);

app.UseExceptionHandler();

if (!app.Environment.IsDevelopment())
    app.UseHsts();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
