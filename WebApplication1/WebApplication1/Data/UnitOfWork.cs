using WebApplication1.Data.Core;
using WebApplication1.Data.Core.IRepositories;
using WebApplication1.Data.Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HrBackend.Data.Core;
using WebApplication1.Dto;
using WebApplication1.Data.Core.Domain;

namespace WebApplication1.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly HrPlatformContext _context;

        public ICandidateRepository Candidates { get; private set; }
        public ISkillRepository Skills { get; private set; }
        public ICandidateSkillRepository CandidateSkills { get; private set; }


        public UnitOfWork(HrPlatformContext context)
        {
            _context = context;
            Candidates = new CandidateRepository(context);
            Skills = new SkillRepository(context);
            CandidateSkills = new CandidateSkillRepository(context);
        }
        public void Dispose()
        {
            _context.Dispose();
        }
        public int SaveChanges()
        {
            return _context.SaveChanges();
        }

        public Candidate CreateCandidateFromDto(CreateCandidateDto dto)
        {
            ICollection<CandidateSkill> skills = new List<CandidateSkill>();
            var query = _context.Skills;
            foreach (var skillID in dto.Skills)
            {
                skills.Add(new CandidateSkill() { SkillID = skillID });
                query.Where(s => s.Id == skillID);

            }
            var candidate = new Candidate()
            {
                FullName = dto.FullName,
                ContactNumber = dto.ContactNumber,
                EMail = dto.EMail,
                DateOfBirth = dto.DateOfBirth,
                Skills = skills
            };
            Candidates.Add(candidate);

            query.ToList();

            return candidate;
        }
        public bool UpdateCandidateFromDto(int id, UpdateCandidateDto dto)
        {
            var candidate = Candidates.GetSingleOrNullWithSkills(id);
            ICollection<CandidateSkill> candidateSkillIntermediary = new List<CandidateSkill>();
            if (candidate is null)
                return false;

            candidate.FullName = dto.FullName ?? candidate.FullName;
            candidate.EMail = dto.EMail ?? candidate.EMail;
            candidate.DateOfBirth = dto.DateOfBirth ?? candidate.DateOfBirth;
            candidate.ContactNumber = dto.ContactNumber ?? candidate.ContactNumber;

            if (dto.Skills is null)
                return false;
            if (dto.Skills.Count > 0)
            {
                foreach (int skillId in dto.Skills)
                {
                    candidateSkillIntermediary.Add
                        (
                        new CandidateSkill
                        {
                            CandidateID = id,
                            SkillID = skillId
                        }
                        );
                }
            }

            candidate.Skills = candidateSkillIntermediary;
            return true;
        }

        public Skill CreateSkillFromDto(CreateSkillDto dto)
        {
            Skill skill = new Skill() { Name = dto.Name };
            
            Skills.Add(skill);

            return skill;
        }
        public bool UpdateSkillFromDto(int id, UpdateSkillDto dto)
        {
          
            var skill = Skills.Get(id);

            if (skill is null)
                return false;

            skill.Name = dto.Name ?? skill.Name;

            return true;

        }
    }
}
