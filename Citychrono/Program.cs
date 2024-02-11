using Citychrono.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace Citychrono
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("CitychronoDbContextConnection") ?? throw new InvalidOperationException("Connection string 'CitychronoDbContextConnection' not found.");

            builder.Services.AddDbContext<CitychronoDbContext>(options => options.UseSqlServer(connectionString));

            builder.Services.AddDefaultIdentity<CitychronoUser>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<CitychronoDbContext>();

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddRazorPages();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
            app.MapRazorPages();

            app.Run();
        }
    }
}
