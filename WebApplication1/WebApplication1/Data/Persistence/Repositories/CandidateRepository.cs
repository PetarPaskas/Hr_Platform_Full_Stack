using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Data.Core.Domain;
using WebApplication1.Data.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Dto;
using System.Linq.Expressions;

namespace WebApplication1.Data.Persistence.Repositories
{
   

    public class CandidateRepository : Repository<Candidate>,ICandidateRepository
    {
        public HrPlatformContext Context { get { return _context as HrPlatformContext; } }

        public CandidateRepository(HrPlatformContext context)
            :base(context)
        {

        }

        public IEnumerable<Candidate> GetCandidatesWithSkills()
        {
            return Context.Candidates.Include(c => c.Skills)
                                      .ThenInclude(cs=>cs.Skill)
                                      .ToList();
        }

        public Candidate GetSingleOrNullWithSkills(int id)
        {
            return Context.Candidates.Include(c=>c.Skills)
                              .ThenInclude(cs=>cs.Skill)
                              .SingleOrDefault(c => c.Id == id);
        }

        public Candidate GetSingleOrNullWithSkills(Expression<Func<Candidate, bool>> predicate)
        {
            return Context.Candidates.Include(c => c.Skills)
                             .ThenInclude(cs => cs.Skill)
                             .SingleOrDefault(predicate);
        }
    }

}
   
