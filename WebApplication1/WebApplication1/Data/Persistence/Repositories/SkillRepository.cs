using WebApplication1.Data.Core.Domain;
using WebApplication1.Data.Core.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace WebApplication1.Data.Persistence.Repositories
{
    class SkillRepository : Repository<Skill>, ISkillRepository
    {
        public HrPlatformContext Context { get { return _context as HrPlatformContext; } }

        public SkillRepository(HrPlatformContext context)
            : base(context)
        {

        }
    }
}
