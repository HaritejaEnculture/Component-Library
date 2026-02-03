# En AI Visual Logic Maps

### 1. Brand Interaction Map (Purple)
[cite_start]*Source: Promary Interaction [cite: 65, 66]*

```mermaid
graph LR
    subgraph "Brand Primitives"
        Pri500[Purple 500 #8b5cf6]
        Pri600[Purple 600 #7c3aed]
        Pri700[Purple 700 #6d28d9]
    end

    subgraph "Interaction Logic"
        Default[Primary BG]
        Border[Primary Border]
        Hover[Hover Surface]
        Subtle[Subtle Text]
    end

    Pri600 -->|Background| Default
    Pri500 -->|Border Color| Border
    Pri700 -->|Text Color| Subtle
    
    style Default fill:#7c3aed,color:#fff