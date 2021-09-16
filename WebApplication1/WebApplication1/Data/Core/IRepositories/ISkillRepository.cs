using WebApplication1.Data.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebApplication1.Data.Core.IRepositories
{
    public interface ISkillRepository : IRepository<Skill>
    {
        HrPlatformContext Context { get; }
    }
}
