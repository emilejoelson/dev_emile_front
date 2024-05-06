import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RulerFactoryOption } from '../../models/pagination/RulerFactoryOption';
import { NumberedPagination } from '../../models/pagination/NumberedPagination';

const ruler = (currentIndex: number, maxPages: number, rulerLength: number): number[] => {
  const array = new Array(rulerLength).fill(null);
  const min = Math.floor(rulerLength / 2);
  return array.map((_, index) => rulerFactory(currentIndex, index, min, maxPages, rulerLength));
};

const rulerFactory = (currentIndex: number, index: number, min: number, maxPages: number, rL: number): number => {
  const factory = {
    [RulerFactoryOption.Start]: () => index + 1,
    [RulerFactoryOption.End]: () => maxPages - rL + index + 1,
    [RulerFactoryOption.Default]: () => currentIndex + index - min,
  };
  return factory[rulerOption(currentIndex, min, maxPages)]();
};

const rulerOption = (currentIndex: number, min: number, maxPages: number): RulerFactoryOption => {
  return currentIndex <= min
    ? RulerFactoryOption.Start
    : currentIndex >= maxPages - min
      ? RulerFactoryOption.End
      : RulerFactoryOption.Default;
};

const allowNavigation = (pageNumber: number, index: number, maxPages: number): boolean => {
  return pageNumber !== index && pageNumber > 0 && pageNumber <= maxPages;
};

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

  @Input() maxPages!: number;
  @Input() index!: number;
  @Input() totalCount!: number;
  @Input() first!: boolean;
  @Input() last!: boolean;

  rulerLength: number = 3;

  @Output() page: EventEmitter<number> = new EventEmitter<number>();
  @Output() recordsPerPage = new EventEmitter<number>();

  constructor() {
    this.calculateRulerLength();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["maxPages"]) {
      this.calculateRulerLength();
    }
  }

  calculateRulerLength(): void {
    this.rulerLength = this.maxPages < 3 ? this.maxPages : 3;
  }

  get pagination(): NumberedPagination {
    const { index, maxPages, rulerLength } = this;
    const pages = ruler(index, maxPages, rulerLength);
    return { index, maxPages, pages } as NumberedPagination;
  }

  navigateToPage(pageNumber: number): void {
    if (allowNavigation(pageNumber, this.index, this.maxPages)) {
      this.index = pageNumber;
      this.page.emit(this.index);
    }
  }
  trackByFn(index: number): number {
    return index;
  }

  onChange(recordsPerPage: Event) {
    const value = Number((recordsPerPage.target as HTMLSelectElement)?.value);
    if (!isNaN(value)) {
      this.recordsPerPage.emit(value);
    }
  }

}
