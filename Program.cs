var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Enable serving static files from the wwwroot folder
// Set default file (index.html) handling
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

// Enable HTTPS redirection
app.UseHttpsRedirection();

// Use CORS policy
app.UseCors("AllowAll");

// Map API controllers
app.MapControllers();

// Redirect requests to index.html if no route matches
app.MapFallbackToFile("index.html");

// Run the application
app.Run();
