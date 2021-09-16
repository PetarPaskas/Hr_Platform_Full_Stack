using System;
using WebApplication1.Data.Core.Domain;
using WebApplication1.Data.Core.IRepositories;
using WebApplication1.Dto;

namespace HrBackend.Data.Core
{
    public interface IUnitOfWork : IDisposable
    {
        ICandidateRepository Candidates { get; }
        ISkillRepository Skills { get; }
        ICandidateSkillRepository CandidateSkills { get; }

        int SaveChanges();

        Candidate CreateCandidateFromDto(CreateCandidateDto dto);
        bool UpdateCandidateFromDto(int id, UpdateCandidateDto dto);

        Skill CreateSkillFromDto(CreateSkillDto dto);
        bool UpdateSkillFromDto(int id, UpdateSkillDto dto);
    }
}
