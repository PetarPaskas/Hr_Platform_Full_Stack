using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HrBackend.Data;
using WebApplication1.Data.Core.Domain;
using WebApplication1.Data.Persistence.EntityConfigurations;

namespace WebApplication1.Data
{
    public class HrPlatformContext :DbContext
    {
        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<CandidateSkill> CandidateSkills { get; set; }

        public HrPlatformContext(DbContextOptions<HrPlatformContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new CandidateConfiguration());
            modelBuilder.ApplyConfiguration(new SkillConfiguration());
            modelBuilder.ApplyConfiguration(new CandidateSkillConfiguration());
        }

    }
}
