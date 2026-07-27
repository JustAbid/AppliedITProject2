from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ImpactStat
from app.schemas import ImpactStatOut

router = APIRouter(prefix="/api/stats", tags=["stats"])


@router.get("", response_model=List[ImpactStatOut])
def list_stats(
    section: Optional[str] = Query(default=None, description="Filter by 'home', 'about', or 'community'"),
    db: Session = Depends(get_db),
) -> List[ImpactStatOut]:
    query = db.query(ImpactStat)
    if section:
        query = query.filter(ImpactStat.section == section)
    stats = query.order_by(ImpactStat.display_order).all()
    return [ImpactStatOut.model_validate(stat) for stat in stats]
