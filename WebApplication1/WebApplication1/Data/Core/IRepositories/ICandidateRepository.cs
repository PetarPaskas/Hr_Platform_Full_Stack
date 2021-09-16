using WebApplication1.Data.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using WebApplication1.Dto;
using System.Linq.Expressions;

namespace WebApplication1.Data.Core.IRepositories
{
    public interface ICandidateRepository : IRepository<Candidate>
    {
        HrPlatformContext Context { get;  }
        IEnumerable<Candidate> GetCandidatesWithSkills();
        Candidate GetSingleOrNullWithSkills(int id);
        Candidate GetSingleOrNullWithSkills(Expression<Func<Candidate,bool>> predicate);
    }
}
