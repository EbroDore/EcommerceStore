using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StoreContext>(options =>
options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
});

app.UseAuthorization();

app.MapControllers();

// Getting hold of the DbContext.Service and storing it inside of the variable (scope)
var scope = app.Services.CreateScope();
// Getting our context (StoreContext) to get all of the information within that class
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
// this allows us to view what happens in the log when the program is run
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

try
{
    // This looks if the database exists or not if it does do nothing
    // If it doesn't create one/apply pending migrations
    context.Database.Migrate();

    DbInitializer.Initialize(context);
}
catch(Exception ex)
{
    logger.LogError(ex, "A problem occured during migration");
}

app.Run();
