package com.concreteware.clientes.model;

import com.concreteware.core.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Cliente extends Usuario {

    private String nitEmpresa;                       // NIT de la empresa cliente
    private String nombreEmpresa;                    // Nombre de la empresa
    private List<String> obrasAsociadasIds;          // Lista de IDs de obras del cliente
}
