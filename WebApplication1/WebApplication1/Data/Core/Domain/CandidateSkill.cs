using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Data.Core.Domain
{
    public class CandidateSkill
    {
        public int CandidateID { get; set; }
        public int SkillID { get; set; }

        public Candidate Candidate { get; set; }
        public Skill Skill { get; set; }
    }
}
