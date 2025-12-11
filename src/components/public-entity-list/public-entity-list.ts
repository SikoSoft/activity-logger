import { ViewElement } from '@/lib/ViewElement';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EntityList } from '@/components/entity-list/entity-list';
import { EntityListResult } from '../entity-list/entity-list.models';
import { storage } from '@/lib/Storage';
import { MobxReactionsController } from '@/lib/MobxReactionController';
import { routerState } from '@/lib/Router';

@customElement('public-entity-list')
export class PublicEntityList extends EntityList {
  private rx = new MobxReactionsController(this);

  @state()
  params: Record<string, string> = {};

  constructor() {
    super();

    //this.state.setListConfigs();

    this.rx.add({
      expr: () => routerState.params,
      effect: newParams => {
        this.params = newParams;
      },
      opts: { fireImmediately: true },
    });
  }

  @state()
  get listConfigId(): string {
    return this.params.id;
  }

  async getEntities(): Promise<EntityListResult> {
    const listResult = await storage.getList(
      this.listConfigId,
      this.start,
      this.perPage,
    );
    if (listResult.isOk) {
      this.state.setEntityConfigs(listResult.value.entityConfigs);
      this.state.setListConfigs([listResult.value.listConfig]);
      this.state.setListConfigId(this.listConfigId);

      return listResult.value;
    }

    return {
      entities: [],
      total: 0,
    };
  }
}
