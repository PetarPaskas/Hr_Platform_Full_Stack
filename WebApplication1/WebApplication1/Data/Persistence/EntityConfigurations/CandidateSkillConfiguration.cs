using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Data.Core.Domain;

namespace WebApplication1.Data.Persistence.EntityConfigurations
{
    public class CandidateSkillConfiguration : IEntityTypeConfiguration<CandidateSkill>
    {
        public void Configure(EntityTypeBuilder<CandidateSkill> candidateSkill)
        {
            candidateSkill.ToTable("CandidateSkills");

            candidateSkill.HasKey(cs=>new {cs.CandidateID,cs.SkillID});
        }
    }
}
