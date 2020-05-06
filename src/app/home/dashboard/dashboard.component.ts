import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { HomeService } from '../home.service';
import { SessionManagementService } from '../../core/auth/session-management.service';
import { SessionManagementInterface } from '../../core/auth/session-management.interface';
import { Observable } from 'rxjs';
import { SoftwareInterface } from '../software.interface';
import { SoftwareService } from '../software.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatAccordion, { static: true }) accordion: MatAccordion;
  software$ = new Observable<SoftwareInterface>();

  selectedApplication = '';

  selectedLabel = '';

  topExceptionState = true;
  topTrendExceptionState = true;
  detailExceptionState = true;
  valores = [];

  atualizaSessao: any;

  constructor(
    private homeService: HomeService,
    private sessionManagementService: SessionManagementService,
    private softwareService: SoftwareService
  ) {}

  ngOnDestroy(): void {
    if (this.atualizaSessao) {
      clearInterval(this.atualizaSessao);
    }
  }

  ngOnInit() {
    // this.monitorarSessao();
  }

  monitorarSessao() {
    this.atualizaSessao = setInterval(() => {
      this.sessionManagementService
        .getDetailByIp(this.homeService.getLocalIpAddress())
        .subscribe((sessao: SessionManagementInterface[]) => {
          if (sessao && sessao.length > 0) {
            let acessoAtualCancelado: SessionManagementInterface;
            let acessoAtual: SessionManagementInterface;
            sessao.forEach((info) => {
              if (
                info.uuidJanela === this.homeService.getUUID() &&
                info.ip === this.homeService.getLocalIpAddress() &&
                info.status === 'CANCELADO'
              ) {
                acessoAtualCancelado = info;
              }

              if (
                info.uuidJanela === this.homeService.getUUID() &&
                info.ip === this.homeService.getLocalIpAddress() &&
                info.status === ''
              ) {
                acessoAtual = info;
              }
            });

            if (acessoAtual && acessoAtualCancelado) {
              console.log('Seu acesso foi cancelado brother...');
            }

            if (acessoAtual && !acessoAtualCancelado) {
              // eh o mesmo acesso, mesmo ip, mesmo uuid
              console.log('Mesmo acesso... Mesmo IP, Mesmo UUID');
            } else if (!acessoAtual && acessoAtualCancelado) {
              console.log('alguem removeu seu acesso.');
            } else {
              clearInterval(this.atualizaSessao);
              if (
                confirm('Ja existe um acesso em andamento, deseja remover ele?')
              ) {
                console.log('Removendo o acesso dele hehe...');
                this.monitorarSessao();
                this.sessionManagementService
                  .cancelarAcessoByIp(this.homeService.getLocalIpAddress())
                  .subscribe(() => {
                    this.sessionManagementService
                      .adicionarAcesso({
                        id: null,
                        uuidJanela: this.homeService.getUUID(),
                        ip: this.homeService.getLocalIpAddress(),
                        usuario: 'p-abezerra',
                        versao: '1.0.0',
                        status: '',
                      })
                      .subscribe(() => {
                        this.sessionManagementService.sessaoAtiva = true;
                      });
                  });
              } else {
                console.log('Removendo seu acesso......');
                this.sessionManagementService.sessaoAtiva = false;
                this.sessionManagementService
                  .adicionarAcesso({
                    id: null,
                    uuidJanela: this.homeService.getUUID(),
                    ip: this.homeService.getLocalIpAddress(),
                    usuario: 'p-abezerra',
                    versao: '1.0.0',
                    status: 'CANCELADO',
                  })
                  .subscribe();
              }
            }
          } else {
            this.sessionManagementService
              .adicionarAcesso({
                id: null,
                uuidJanela: this.homeService.getUUID(),
                ip: this.homeService.getLocalIpAddress(),
                usuario: 'p-abezerra',
                versao: '1.0.0',
                status: '',
              })
              .subscribe();
            console.log('ACESSO LIBERADO!!!');
            this.sessionManagementService.sessaoAtiva = true;
          }
        });
    }, 5000);
  }

  onLabelSelected(valor) {
    this.selectedLabel = valor;
  }

  toggleState(comp, state: boolean) {
    if (state) {
      $('#' + comp).show();
    } else {
      $('#' + comp).hide();
    }
  }

  changeApplication(componente) {
    this.selectedApplication = componente.application;
    this.software$ = this.softwareService.getSoftwareByPublicKey(
      componente.application
    );
  }

  onSummaryChartLoad(opts) {
    this.valores = opts;
  }

  openTopExceptionPanel() {
    this.topExceptionState = true;
    this.toggleState('top-exception', true);
  }

  closeTopExceptionPanel(panel) {
    this.topExceptionState = false;
    this.toggleState('top-exception', false);
    panel.toggle();
  }

  openTopTrendPanel() {
    this.topTrendExceptionState = true;
    this.toggleState('top-trend-exception', true);
  }
  closeTopTrendPanel(panel) {
    this.topTrendExceptionState = false;
    this.toggleState('top-trend-exception', false);
    panel.toggle();
  }

  openDetailPanel() {
    this.detailExceptionState = true;
    this.toggleState('detail-exception', true);
  }
  closeDetailPanel(panel) {
    this.detailExceptionState = false;
    this.toggleState('detail-exception', false);
    panel.toggle();
  }
}
