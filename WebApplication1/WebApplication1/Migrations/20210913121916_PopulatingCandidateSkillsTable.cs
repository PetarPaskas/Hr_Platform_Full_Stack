using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Migrations
{
    public partial class PopulatingCandidateSkillsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO CandidateSkills(CandidateID,SkillID) VALUES (1,1), (1,2), (1,3), (2,1),(2,5), (3,1), (3,5)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM CandidateSkills");
        }
    }
}
