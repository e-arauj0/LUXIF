# **LUXIF**

Projeto integrador do 2º semestre de Engenharia de Computação do Instituto Federal de São Paulo, câmpus Guarulhos.

Integrantes:
* Eduardo Luciano Martinez
* Emily Oliveira Araujo
* Henrique Ferreira Defavere
* Rafael Shiguemi Usui Ramos
* Vinícius Martins Pereira

---

# Descrição do Projeto
O LUXIF é um projeto para **mostrar como montar um luxímetro**. O objetivo não é ser um ótimo luxímetro, e sim uma base simples e replicável para construir um com microcontrolador e bateria: um LDR (sensor de luz barato), um Arduino Uno, um display OLED e uma bateria de 9 V.

O LDR forma um divisor de tensão com um entre quatro resistores de referência (1 kΩ, 10 kΩ, 100 kΩ e 470 kΩ), escolhido automaticamente pelo Arduino para medir tanto na penumbra quanto em ambientes claros. A faixa em uso é indicada por LEDs azuis e a leitura em lux aparece no display. O repositório traz o esquema elétrico, a lista de materiais, o código e um passo a passo de montagem, no [site do projeto](index.html).

Sem calibração, os valores em lux são estimativas: o LDR varia de uma peça para outra. Para medidas rigorosas, compare com um luxímetro calibrado e ajuste as constantes do código.

## Extensão: internet com ESP32
Por causa de um projeto de extensão, foi acrescentada uma versão com ESP32 que envia as leituras pela internet para uma página do site. É uma parte secundária e opcional: o luxímetro funciona sozinho, só com o Arduino.

# Estrutura do Repositório
```
luxif
|- README.md            # Apresenta o projeto
|- index.html           # Página principal do site
|- paginas/             # Para as páginas secundárias (inclui o guia de montagem)
|- css/                 # Para os arquivos de estilização
|- imagens/             # Para as imagens usadas no site (inclui o esquema elétrico)
|- js/                  # Para os scripts do site (tema e conexão com o LUXIF)
|- icones/              # Para os ícones do site
|- codigo/
|   |- luxif/           # Código para o Arduino Uno (o luxímetro)
|   |- luxif_wifi/      # Extensão com Wi-Fi, para o ESP32
|- documento/           # Artigo sobre o projeto (PDF)
|   |- latex/           # Código-fonte do artigo em LaTeX
<<<<<<< HEAD
<<<<<<< HEAD
```
=======
```
>>>>>>> origin/estrutura
=======
```

# Como gerar o artigo
O artigo está em `documento/LUXIF.pdf`. Para gerá-lo de novo a partir do fonte, é preciso ter o LaTeX instalado (com os pacotes `pgfplots` e `babel` em português):

```
cd documento/latex
latexmk -pdf luxif.tex
```

A figura do esquema elétrico (`documento/latex/figuras/esquema-eletrico.pdf`) vem do mesmo arquivo usado no site, `imagens/esquema-eletrico.svg`. Se você alterar o esquema, gere o PDF da figura de novo a partir do SVG.
>>>>>>> origin/conteudo
