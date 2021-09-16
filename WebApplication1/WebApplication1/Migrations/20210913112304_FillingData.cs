using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class FillingData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO Candidates(FullName, DateOfBirth, ContactNumber, EMail) VALUES  ('John Smith','1999-01-15','+381648885223','John@gmail.com'),('Mariah Smith','1969-02-25','0657724009','Mariah@outlook.com'),('Petar Petrović','1989-11-05','+384648485243','Petar@yahoo.com')");
            migrationBuilder.Sql(@"INSERT INTO Skills(Name) VALUES ('C# programming'),('Java programming'),('English'),('Russian'),('Database design')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Candidates");
            migrationBuilder.Sql("DELETE FROM Skills");
        }
    }
}
