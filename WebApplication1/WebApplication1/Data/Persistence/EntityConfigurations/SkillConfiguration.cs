using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data.Core.Domain;

namespace WebApplication1.Data.Persistence.EntityConfigurations
{
    public class SkillConfiguration : IEntityTypeConfiguration<Skill>
    {
        public void Configure(EntityTypeBuilder<Skill> skill)
        {
            skill.ToTable("Skills");

            skill.HasKey(s => s.Id);

            skill.HasMany(s => s.CandidateSkill)
                .WithOne(cs => cs.Skill)
                .HasForeignKey(cs => cs.SkillID);

            skill.Property(s => s.Name)
                .HasMaxLength(255)
                .IsRequired();

            skill.HasIndex(skill => skill.Name)
                .IsUnique();
               

        }
    }
}
