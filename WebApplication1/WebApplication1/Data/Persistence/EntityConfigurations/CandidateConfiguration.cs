using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApplication1.Data.Core.Domain;

namespace WebApplication1.Data.Persistence.EntityConfigurations
{
    public class CandidateConfiguration : IEntityTypeConfiguration<Candidate>
    {
        public void Configure(EntityTypeBuilder<Candidate> candidate)
        {
            candidate.ToTable("Candidates");

            candidate.HasKey(c=>c.Id);

            candidate.HasMany(c => c.Skills)
                .WithOne(s => s.Candidate)
                .HasForeignKey(s => s.CandidateID);

            candidate.Property(c => c.FullName)
                .HasMaxLength(100)
                .IsRequired();

            candidate.Property(c => c.DateOfBirth)
                .IsRequired();

            candidate.Property(c => c.ContactNumber)
                .HasMaxLength(50)
                .IsRequired();

            candidate.Property(c => c.EMail)
                .HasMaxLength(100)
                .IsRequired();
        }
    }
}
